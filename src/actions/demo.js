export const DEMO_ACTION = 'DEMO_ACTION'

export function demoAction (number) {
  number = parseInt(number)
  return {
    type: DEMO_ACTION,
    data: {
      number
    },
    promise: () => new Promise((resolve) => {
      setTimeout(() => resolve(number * number), 2050)
    })
  }
}
