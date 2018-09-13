exports.seed = function (knex, Promise) {
  return knex('individual_cost').del()
    .then(() => knex('individual_cost').insert([
      {user_id: 1, pessimistic: '200', optimistic: '100', likely: '150', group_id: 1},
      {user_id: 2, pessimistic: '300', optimistic: '200', likely: '250', group_id: 1},
      {user_id: 3, pessimistic: '400', optimistic: '300', likely: '350', group_id: 1},
      {user_id: 4, pessimistic: '500', optimistic: '400', likely: '450', group_id: 2},
      {user_id: 5, pessimistic: '600', optimistic: '500', likely: '550', group_id: 2},
      {user_id: 6, pessimistic: '700', optimistic: '600', likely: '650', group_id: 2},
      {user_id: 7, pessimistic: '800', optimistic: '700', likely: '750', group_id: 3},
      {user_id: 8, pessimistic: '900', optimistic: '800', likely: '850', group_id: 3},
      {user_id: 9, pessimistic: '1000', optimistic: '900', likely: '950', group_id: 3},
      {user_id: 10, pessimistic: '1100', optimistic: '1000m', likely: '1050', group_id: 4},
      {user_id: 11, pessimistic: '1200', optimistic: '1100m', likely: '1150', group_id: 4},
      {user_id: 12, pessimistic: '1300', optimistic: '1200m', likely: '1250', group_id: 4}
    ])
    )
}
