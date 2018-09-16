exports.seed = function (knex, Promise) {
  return knex('group_benefit').del()
    .then(() => knex('group_benefit').insert([
      {group_id: 1, pessimistic: '90', optimistic: '45', likely: '50', chance_of_success: 90},
      {group_id: 2, pessimistic: '90', optimistic: '45', likely: '50', chance_of_success: 90},
      {group_id: 3, pessimistic: '90', optimistic: '45', likely: '50', chance_of_success: 90},
      {group_id: 4, pessimistic: '80', optimistic: '40', likely: '45', chance_of_success: 80},
      {group_id: 5, pessimistic: '80', optimistic: '40', likely: '45', chance_of_success: 80},
      {group_id: 6, pessimistic: '80', optimistic: '40', likely: '45', chance_of_success: 80},
      {group_id: 7, pessimistic: '70', optimistic: '35', likely: '40', chance_of_success: 70},
      {group_id: 8, pessimistic: '70', optimistic: '35', likely: '40', chance_of_success: 70},
      {group_id: 9, pessimistic: '70', optimistic: '35', likely: '40', chance_of_success: 70},
      {group_id: 10, pessimistic: '60', optimistic: '30', likely: '35', chance_of_success: 60},
      {group_id: 11, pessimistic: '60', optimistic: '30', likely: '35', chance_of_success: 60},
      {group_id: 12, pessimistic: '60', optimistic: '30', likely: '35', chance_of_success: 60}
    ])
    )
}
