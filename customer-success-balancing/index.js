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

  const descendingOrder = (list, sortParam) => {
    return list.sort((a,b) => a[sortParam] - b[sortParam]);
  }

  const ascendingOrder = (list, sortParam) => {
    return list.sort((a,b) => b[sortParam] - a[sortParam]);
  }

  const balancing = (csList, customers) => {
    const csBalanced = csList.map((cs) => {  
      cs.customers = 0;
      customers.map((customer, id) => {
        if (customer.score <= cs.score) {
          cs.customers++;
          delete customers[id];
        }

      });
      return cs;
    });
    return ascendingOrder(csBalanced, 'customers');
  }

  const finalResult = (customersBalanced) => {
    if (customersBalanced[0].customers === customersBalanced[1].customers) return 0;
    return customersBalanced[0].id;
  }

  const avaliableCS = removeCSAway(customerSuccess, customerSuccessAway);
  const customersBalanced = balancing(descendingOrder(avaliableCS, 'score'), descendingOrder(customers, 'score'));
  return finalResult(customersBalanced);
}

module.exports = customerSuccessBalancing;