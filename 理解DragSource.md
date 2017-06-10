  # DragSource 

Wrap your component with DragSource to make it draggable. DragSource is a higher-order component accepting three required parameters. They are described in detail below.

To use DragSource, don't forget to wrap the top-level component of your app in a DragDropContext.

  ## Signature 

DragSource uses partial application.
After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call.
This signature makes DragSource usable as an ES7 decorator. 
Read the overview for a more detailed explanation of the decorators and the higher-order components.

```
//ES7
import { DragSource } from 'react-dnd';

@DragSource(type, spec, collect)
export default class MyComponent {
  /* ... */
}
```

```
//ES6
import { DragSource } from 'react-dnd';

class MyComponent {
  /* ... */
}

export default DragSource(type, spec, collect)(MyComponent);
```

```
//ES5
var createReactClass = require('create-react-class');
var DragSource = require('react-dnd').DragSource;

var MyComponent = createReactClass({
  /* ... */
});
```

  ## Parameters 

  * type: Required. Either a string, an ES6 symbol, or a function that returns either given the component's props. Only the drop targets registered for the same type will react to the items produced by this drag source. Read the overview to learn more about the items and types.

  * spec: Required. A plain JavaScript object with a few allowed methods on it. It describes how the drag source reacts to the drag and drop events. See the drag source specification described in detail in the next section.

  * collect: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters: connect and monitor. Read the overview for an introduction to the monitors, the connectors, and the collecting function. See the collecting function described in detail after the next section.

  * options: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom arePropsEqual(props, otherProps) function inside the options object can improve the performance. Unless you have performance problems, don't worry about it.
  
  
  ## Drag Source Specification 

The second spec parameter must be a plain object implementing the drag source specification. Below is the list of all methods that it may have.

  ### Specification Methods 

  * **beginDrag(props, monitor, component):** Required. When the dragging starts, beginDrag is called. You must return a plain JavaScript object describing the data being dragged. What you return is the only information available to the drop targets about the drag source so it's important to pick the minimal data they need to know. You may be tempted to put a reference to the component into it, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like { id: props.id } from this method.

  * **endDrag(props, monitor, component):** Optional. When the dragging stops, endDrag is called. For every beginDrag call, a corresponding endDrag call is guaranteed. You may call monitor.didDrop() to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a drop result by returning a plain object from its drop() method, it will be available as monitor.getDropResult(). This method is a good place to fire a Flux action. Note: If the component is unmounted while dragging, component parameter is set to be null.

  * **canDrag(props, monitor):** Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over props. Note: You may not call monitor.canDrag() inside this method.

  * **isDragging(props, monitor):** Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom isDragging method. It might return something like props.id === monitor.getItem().id. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. Note: You may not call monitor.isDragging() inside this method.


