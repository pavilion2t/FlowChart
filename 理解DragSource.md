  # DragSource拖放源

Wrap your component with DragSource to make it draggable. DragSource is a higher-order component accepting three required parameters. They are described in detail below.把你的组件包裹在拖放源中，以使其可拖放。拖放源是一个更高层级的组件，接收三个必须的参数，以下详细阐述。

To use DragSource, don't forget to wrap the top-level component of your app in a DragDropContext.要使用拖放源，别忘了把最高级的组件包裹在DragDropContext里面。

  ## Signature署名 

DragSource uses partial application.拖放源使用部分应用程序？？？  

After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call.第一次调用要详细说明参数信息，然后在第二次调用时你需要传递React组件Class作为唯一参数。   

This signature makes DragSource usable as an ES7 decorator. 这个署名让拖放源变成一个ES7装饰器，并且可以使用。   

Read the overview for a more detailed explanation of the decorators and the higher-order components.通过阅读概览可以更详细了解装饰器和高层级组件。

```
//ES7
import { DragSource } from 'react-dnd';

@DragSource(type, spec, collect)
export default class MyComponent {

}
```

```
//ES6
import { DragSource } from 'react-dnd';

class MyComponent {

}

export default DragSource(type, spec, collect)(MyComponent);
```

```
//ES5
var createReactClass = require('create-react-class');
var DragSource = require('react-dnd').DragSource;

var MyComponent = createReactClass({

});
```

  ## Parameters参数 

  * **type类型:** Required.必须的。  
  Either a string, an ES6 symbol, or a function that returns either given the component's props. Only the drop targets registered for the same type will react to the items produced by this drag source. Read the overview to learn more about the items and types.

  * **spec:** Required. A plain JavaScript object with a few allowed methods on it. It describes how the drag source reacts to the drag and drop events. See the drag source specification described in detail in the next section.

  * **collect:** Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters: connect and monitor. Read the overview for an introduction to the monitors, the connectors, and the collecting function. See the collecting function described in detail after the next section.

  * **options:** Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom arePropsEqual(props, otherProps) function inside the options object can improve the performance. Unless you have performance problems, don't worry about it.
  
  
  ## Drag Source Specification 

The second spec parameter must be a plain object implementing the drag source specification. Below is the list of all methods that it may have.

  ### Specification Methods 

  * **beginDrag(props, monitor, component):** Required. When the dragging starts, beginDrag is called. You must return a plain JavaScript object describing the data being dragged. What you return is the only information available to the drop targets about the drag source so it's important to pick the minimal data they need to know. You may be tempted to put a reference to the component into it, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like { id: props.id } from this method.

  * **endDrag(props, monitor, component):** Optional. When the dragging stops, endDrag is called. For every beginDrag call, a corresponding endDrag call is guaranteed. You may call monitor.didDrop() to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a drop result by returning a plain object from its drop() method, it will be available as monitor.getDropResult(). This method is a good place to fire a Flux action. Note: If the component is unmounted while dragging, component parameter is set to be null.

  * **canDrag(props, monitor):** Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over props. Note: You may not call monitor.canDrag() inside this method.

  * **isDragging(props, monitor):** Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom isDragging method. It might return something like props.id === monitor.getItem().id. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. Note: You may not call monitor.isDragging() inside this method.


  ## Specification Method Parameters 

  * **props:** Your component's current props.

  * **monitor:** An instance of DragSourceMonitor. Use it to query the information about the current drag state, such as the currently dragged item and its type, the current and initial coordinates and offsets, and whether it was dropped yet. Read the DragSourceMonitor documentation for a complete list of monitor methods, or read the overview for an introduction to the monitors.

  * **component:** When specified, it is the instance of your component. Use it to access the underlying DOM node for position or size measurements, or to call setState, and other component methods. It is purposefully missing from isDragging and canDrag because the instance may not be available by the time they are called. If you want these methods to depend on the component's state, consider lifting the state to the parent component, so that you can just use props. Generally your code will be cleaner if you rely on props instead whenever possible.
  
  
  
  
  ## The Collecting Function 

Just specifying the drag source type and spec is not quite enough.
There's still a few more things we need to take care of:

  * connect the React DnD event handlers to some node in the component;
  * pass some knowledge about the dragging state to our component.  
  
All communication between the React components happens via props, so it makes sense that React DnD injects special props into your component. However it gives you the freedom to name them and decide what props your component will receive.

Your collecting function will be called by React DnD with a connector that lets you connect nodes to the DnD backend, and a monitor to query information about the drag state. It should return a plain object of props to inject into your component.

If you're new to these concepts, the overview should give you a good idea about them.  


  ## Parameters 

  * **connect:** An instance of DragSourceConnector. It has two methods: dragPreview() and dragSource(). Of them, dragSource() is the one you'll use the most. It returns a function you need to pass down to your component to connect the source DOM node to the React DnD backend. If you return something like { connectDragSource: connect.dragSource() } from your collect function, the component will receive connectDragSource as a prop so you can mark the relevant node inside its render() as draggable: return this.props.connectDragSource(<div>...</div>). You can see this pattern in action in the example at the end of this file. Read the DragSourceConnector documentation for a complete list of connect methods, or read the overview for an introduction to the connectors.

  * **monitor:** An instance of DragSourceMonitor. It is precisely the same monitor you receive in the drag source specification methods, and you can use it to query the information about the current drag state. Read the DragSourceMonitor documentation for a complete list of monitor methods, or read the overview for an introduction to the monitors.



  ## Return Value 

DragSource wraps your component and returns another React component.
For easier testing, it provides an API to reach into the internals:

  ## Static Properties 

  * **DecoratedComponent:** Returns the wrapped component type.

  ## Instance Methods 

  * **getDecoratedComponentInstance():** Returns the wrapped component instance.

  * **getHandlerId():** Returns the drag source ID that can be used to simulate the drag and drop events with the testing backend. Refer to the testing tutorial for a usage example.

  ## Nesting Behavior 

If a drag source is nested in another drag source, the innermost drag source of the compatible type wins. Drag sources that return false from canDrag are skipped. The chosen drag source is the only one that will receive beginDrag and, subsequently, endDrag. There is no propagation once the drag source is determined.


  ## Example
  
  ```
import React from 'react';
import { DragSource } from 'react-dnd';

const Types = {
  CARD: 'card'
};

const cardSource = {
  canDrag(props) {
    return props.isReady;
  },

  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {

      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card {
  render() {
    const { id } = this.props;
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);
```

