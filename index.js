export let linkedTree = {}
  
export const addToLinkedTree = (input) => linkedTree = Object.assign({}, linkedTree, input )

export const linkedTreeReduce = (linkedList, startAt, oldState, newState, action, options) => {
    const comp = linkedList[startAt](oldState, newState, action)
    return [undefined, true].includes(comp.renderOn) && comp.fn
      ? runAndFlush(
          linkedList[startAt](oldState, newState, action).fn,
          options && options.flush, 
          newState
        )
  	  : [undefined, true].includes(comp.renderOn) && comp.passThrough
        ? comp.passThrough.map(nextComp => linkedTreeReduce(linkedList, nextComp, oldState, newState, action, options))
    	: undefined
  }

const runAndFlush = (fn, flush, state) => {
  const firstLinkedTreeKey = Object.keys(linkedTree)[0]
  flush
    ? linkedTree = {
      [firstLinkedTreeKey]: linkedTree[firstLinkedTreeKey]
    }
    : undefined
  fn({ state })
}
  