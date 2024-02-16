import { useGameStore } from "src/stores/GameStore.js";

export function useHelpers() {

  var game = useGameStore();

  function getDevSalary(developer) {
    return (developer.seniority/3)*game.config.maxDevSalary;
  }

  function getSaleSalary(salesman) {
    return (salesman.experience/3)*game.config.maxSaleSalary;
  }

  function formatMoney(amount) {
    // return parseFloat(amount).toFixed(2);
    return amount.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'EUR',
    });
  }

  function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return { formatMoney, getDevSalary, getSaleSalary, getRandomArbitrary };
}