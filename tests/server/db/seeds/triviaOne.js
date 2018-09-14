exports.seed = function (knex, Promise) {
  return knex('trivia_one').del()
    .then(() => knex('trivia_one').insert([
      {user_id: 1, brier_score_one: 0.9, brier_score_two: 0.9, brier_score_three: 0.9, brier_score_four: 0.9, brier_score_five: 0.9, brier_score_total: 0.9},
      {user_id: 2, brier_score_one: 0.8, brier_score_two: 0.8, brier_score_three: 0.8, brier_score_four: 0.8, brier_score_five: 0.8, brier_score_total: 0.8},
      {user_id: 3, brier_score_one: 0.7, brier_score_two: 0.7, brier_score_three: 0.7, brier_score_four: 0.7, brier_score_five: 0.7, brier_score_total: 0.7},
      {user_id: 4, brier_score_one: 0.6, brier_score_two: 0.6, brier_score_three: 0.6, brier_score_four: 0.6, brier_score_five: 0.6, brier_score_total: 0.6},
      {user_id: 5, brier_score_one: 0.5, brier_score_two: 0.5, brier_score_three: 0.5, brier_score_four: 0.5, brier_score_five: 0.5, brier_score_total: 0.5},
      {user_id: 6, brier_score_one: 0.4, brier_score_two: 0.4, brier_score_three: 0.4, brier_score_four: 0.4, brier_score_five: 0.4, brier_score_total: 0.4},
      {user_id: 7, brier_score_one: 0.3, brier_score_two: 0.3, brier_score_three: 0.3, brier_score_four: 0.3, brier_score_five: 0.3, brier_score_total: 0.3},
      {user_id: 8, brier_score_one: 0.2, brier_score_two: 0.2, brier_score_three: 0.2, brier_score_four: 0.2, brier_score_five: 0.2, brier_score_total: 0.2},
      {user_id: 9, brier_score_one: 0.1, brier_score_two: 0.1, brier_score_three: 0.1, brier_score_four: 0.1, brier_score_five: 0.1, brier_score_total: 0.1}
    ])
    )
}
