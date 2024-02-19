import { defineStore } from "pinia";
import { useHelpers } from "src/composables/useHelpers";

export let useGameStore = defineStore("game", {
  persist: {
    path: null,
  },
  state: () => ({
    amount: 5000,
    selectedProject: null,
    projects: [],
    developers: [],
    salesmen: [],
    loading: true,
    error: null,
    interval: null,
    quasar: null,
    config: {
      startingBudget: 5000,
      projectTiming: 15, // a 1:1 seniority:complexity timing for a project
      projectSeekingTiming: 5, // timing for a senior salesman to seek a new project
      projectValueFactor: 1, // based on dev salary value
      maxDevSalary: 180, // maximum developer salary (per second)
      maxSaleSalary: 250, // maximum salesman salary (per second)
      maxShopDevs: 3, // 
      maxShopSales: 3, // 
    },
    shop: {
      developers: [],
      salesmen: []
    }
  }),

  actions: {
    async fetchProjects() {
      console.log("fetching projects...");
      // try {
      //   let response = await import("src/projects.json");
      //   this.projects = response.data;
      // } catch (error) {
      //   this.error = error;
      // }
      this.projects = [];
      await this.generateNewProject(1);
    },

    async fetchDevelopers() {
      console.log("fetching developers...");
      // try {
      //   let response = await import("src/developers.json");
      //   this.developers = response.data;
      // } catch (error) {
      //   this.error = error;
      // }
      this.developers = [];
      let dev = await this.generateRandomPerson('developer', 1);
      this.developers.push(dev);
    },
    
    async fetchSalesmen() {
      console.log("fetching salesmen...");
      // try {
      //   let response = await import("src/salesmen.json");
      //   this.salesmen = response.data;
      // } catch (error) {  
      //   this.error = error;
      // }
      this.salesmen = [];
      let salesman = await this.generateRandomPerson('salesman', 1);
      this.salesmen.push(salesman);
    },

    async init() {
      if(this.interval !== null ) {
        clearInterval(this. interval);
      }

      this.developers = [];
      this.projects = [];
      this.salesmen = [];

      this.loading = true;
      await Promise.all([
        await this.fetchProjects(), 
        await this.fetchDevelopers(),
        await this.fetchSalesmen(),
      ]);
      this.loading = false;
      
      this.interval = setInterval(this.clock, 1000); 
    },

    restart() {
      clearInterval(this. interval);
      this.$reset();
      this.amount = this.config.startingBudget;  
      this.init();
    },

    gameOver() {
      clearInterval(this. interval);
    },

    clock() {

      let { getDevSalary, getSaleSalary } = useHelpers();

      // check is game over?
      if(this.amount < 0) {
        this.gameOver();
      }

      // pay salaries!
      var totalSalary = 0;
      this.developers.forEach(developer => {
        totalSalary += getDevSalary(developer);
      });
      this.salesmen.forEach(salesman => {
        totalSalary += getSaleSalary(salesman);
      });
      this.amount -= totalSalary;
      // console.info('total salary:', totalSalary);

      // checking if salesmen need to seek new projects
      this.salesmen.forEach(salesman => {
        if(salesman.start == null || typeof salesman.start == 'undefined') {
          salesman.start = new Date().getTime();
          salesman.duration = (3/salesman.experience)*this.config.projectSeekingTiming;
        } else {
          if(this.getSeekingProgression(salesman) >= 100) {
            this.generateNewProject(salesman.experience);
            salesman.start = null;
          }
        }
      });

      // checking for completed projects...and money
      this.inprogressProjects.forEach(project => {
        if(this.getProjectProgression(project) >= 100) {
          this.completeProject(project);
        }
      });

      // assign first right level developer to new projects
      this.unassignedProjects.forEach(project => {
        let selectedDev = null;
        let freeRightLevelDevs = this.freeDevelopers.filter((dev) => dev.level == project.complexity); 
        if(freeRightLevelDevs.length > 0) {
          selectedDev = freeRightLevelDevs[0];
        } else if(this.freeDevelopers.length > 0) {
          selectedDev = this.freeDevelopers[0]
        }
        if(selectedDev !== null) {
          this.assignProject(project, selectedDev);
        }
      });


    },

    getProjectProgression(project) {
      var p = this.projects.find(({ id }) => project.id == id);
      var now = new Date().getTime()
      var start = project.developer.start;
      var elapsedSeconds = Math.round((now-start)/1000);
      return (100/project.developer.duration)*elapsedSeconds;
    },

    getSeekingProgression(salesman) {
      var s = this.salesmen.find(({ id }) => salesman.id == id);
      if(typeof s !== 'undefined') {
        if(s.start == null || typeof s.start == 'undefined') {
          return 0;
        } else {
          var now = new Date().getTime()
          var start = s.start;
          var elapsedSeconds = Math.round((now-start)/1000);
          return (100/s.duration)*elapsedSeconds;
        }
      }
    },

    assignProject(project, developer) {
      var p = this.projects.find(({ id }) => project.id == id);
      developer.start = new Date().getTime();
      developer.duration = (project.complexity/developer.seniority)*this.config.projectTiming;
      p.developer = developer;
      p.status = "in progress";

      var d = this.developers.find((dev) => developer.id == dev.id);
      d.project = project;
      d.status = 1;
    },

    completeProject(project) {
      var p = this.projects.find(({ id }) => project.id == id);
      p.status = "completed";

      var d = this.developers.find(({ id }) => p.developer.id == id);
      d.project = null;
      d.status = 0;

      this.amount += project.amount;

      this.quasar.notify({
        position: 'top',
        type: 'positive',
        html: true,
        message: `il progetto <strong>${project.name}</strong> è stato completato!<br />Hai guadagnato <strong>€ ${project.amount}</strong>`
      })

    },

    async generateNewProject(level) {
      const res = await fetch('https://randomuser.me/api/');
      const random = await res.json();
      var newProject = {
        id: random.results[0].login.uuid,
        name: `Progetto ${random.results[0].location.city}`,
        complexity: level,
        amount: level * Math.round((this.config.projectValueFactor * this.config.maxDevSalary * this.config.projectTiming) * (1+(Math.floor(Math.random() * 50)/100))),
        status: "pending",
        developer: null
      };
      this.projects.push(newProject);
    },

    addDeveloper(developer) {
      this.developers.push(developer);
      this.shop.developers = this.shop.developers.filter((d) => d != developer)
      this.generateShop();
    },

    addSalesman(saleman) {
      this.salesmen.push(saleman);
      this.shop.salesmen = this.shop.salesmen.filter((s => s != saleman))
      this.generateShop();
    },

    async generateShop() {
      var missingDevs = this.config.maxShopDevs - this.shop.developers.length;
      for(var i=0;i<missingDevs;i++) {
        this.shop.developers.push(await this.generateRandomPerson());
      }

      var missingSales = this.config.maxShopSales - this.shop.salesmen.length;
      for(var i=0;i<missingSales;i++) {
        this.shop.salesmen.push(await this.generateRandomPerson('salesman'));
      }
    },

    async generateRandomPerson(type='developer', level=0) {
      let { getRandomArbitrary } = useHelpers();
      const res = await fetch('https://randomuser.me/api/');
      const random = await res.json();
      if(type == 'developer') {
        return {
          id: random.results[0].login.uuid,
          name: `${random.results[0].name.first} ${random.results[0].name.last}`,
          seniority: level == 0 ? getRandomArbitrary(1,3) : level,
          status: 0,
          avatar: `https://gravatar.com/avatar/${new Date().getTime()}?s=400&d=robohash&r=x`,
          project: null
        };
      } else {
        return {
          id: random.results[0].login.uuid,
          name: `${random.results[0].name.first} ${random.results[0].name.last}`,
          experience: level == 0 ? getRandomArbitrary(1,3) : level,
          avatar: `https://i.pravatar.cc/150?u=${new Date().getTime()}`,
          project: null
        }
      }
    },
    
  },

  getters: {    
    unassignedProjects() {
      return this.projects.filter((d) => d.status == 'pending').sort((a, b) => {
        return a.complexity - b.complexity;
      });
    },
    
    inprogressProjects() {
      return this.projects.filter((p) => p.status == 'in progress');
    },

    incompleteProjects() {
      return this.projects.filter((p) => p.status != 'completed');
    },

    freeDevelopers() {
      return this.developers.filter((d) => d.status == 0);
    },
  },
});