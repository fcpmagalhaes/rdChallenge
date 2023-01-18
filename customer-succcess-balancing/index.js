/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
 function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {

  const removeCSAway = (csList, csAway) => {
    return csList.filter((cs) => !csAway.includes(cs.id));
  }

  const genericOrdering = (list, sortParam) => {
    return list.sort((a,b) => a[sortParam] - b[sortParam]);
  }

  const balancing = (csList, customers) => {
    return csList.map((cs) => {  
      cs.customers = [];
      customers.map((customer, id) => {
        if (cs.score >= customer.score) {
          cs.customers.push(customer);
          delete customers[id];
        }
      });
      return cs;
    });
  }

  const CSWithMoreCustomers = (csList) => {
    let csWinner = [csList[0]];
  
    csList.map((cs, id, array) => {
      const nextIndex = id + 1;
      if (nextIndex < array.length) {
        if (csWinner[csWinner.length - 1].customers.length < array[nextIndex].customers.length) {
          csWinner = [array[nextIndex]];
        }
        if (csWinner[csWinner.length - 1].customers.length === array[nextIndex].customers.length) {
          csWinner.push(array[nextIndex]);
        }
      }
    });

    if (csWinner.length > 1) return 0;
    return csWinner[0].id;
  }

  const avaliableCS = removeCSAway(customerSuccess, customerSuccessAway);
  const avaliableCSOrdered = genericOrdering(avaliableCS, 'score');
  const custumersOrdered = genericOrdering(customers, 'score');
  const customersBalanced = balancing(avaliableCSOrdered, custumersOrdered);
  
  // customersBalanced.map((b) => {
  //   console.log(b);
  // });
  
  return CSWithMoreCustomers(customersBalanced);
  // console.log(winner);
}

module.exports = customerSuccessBalancing;