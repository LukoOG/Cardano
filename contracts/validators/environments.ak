use env

test environments() {
  trace @"env.age": env.age
  trace @"env.eaten": env.eaten
  and {
    env.age == 1,
    env.eaten,
  }
}
