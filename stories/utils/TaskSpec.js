import {createSpec, faker} from '@helpscout/helix'

const TaskSpec = createSpec({
  id: faker.random.uuid(),
  task: faker.lorem.words(3),
})

export default TaskSpec
