exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {user_id: 1, name: 'Test Tester1', email: 'test@test1.com', work_email: 'test@worktest1.com', group_id: 1},
      {user_id: 2, name: 'Test Tester2', email: 'test@test2.com', work_email: 'test@worktest2.com', group_id: 1},
      {user_id: 3, name: 'Test Tester3', email: 'test@test3.com', work_email: 'test@worktest3.com', group_id: 1},
      {user_id: 4, name: 'Test Tester4', email: 'test@test4.com', work_email: 'test@worktest4.com', group_id: 2},
      {user_id: 5, name: 'Test Tester5', email: 'test@test5.com', work_email: 'test@worktest5.com', group_id: 2},
      {user_id: 6, name: 'Test Tester6', email: 'test@test6.com', work_email: 'test@worktest6.com', group_id: 2},
      {user_id: 7, name: 'Test Tester7', email: 'test@test7.com', work_email: 'test@worktest7.com', group_id: 3},
      {user_id: 8, name: 'Test Tester8', email: 'test@test8.com', work_email: 'test@worktest8.com', group_id: 3},
      {user_id: 9, name: 'Test Tester9', email: 'test@test9.com', work_email: 'test@worktest9.com', group_id: 3},
      {user_id: 10, name: 'Test Tester10', email: 'test@test10.com', work_email: 'test@worktest10.com', group_id: 4},
      {user_id: 11, name: 'Test Tester11', email: 'test@test11.com', work_email: 'test@worktest11.com', group_id: 4},
      {user_id: 12, name: 'Test Tester12', email: 'test@test12.com', work_email: 'test@worktest12.com', group_id: 4}
    ])
    )
}
