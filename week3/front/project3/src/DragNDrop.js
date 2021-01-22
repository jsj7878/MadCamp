import React, {useState, useRef, useEffect} from 'react'

function DragNDrop({data}) {

    const [list, setList] = useState(data); 
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    const dragItem = useRef();
    const dragItemNode = useRef();
    
    const handleDragStart = (e, item) => {
        console.log('Starting to drag', item)
        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true); 
        },0)       
    }
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem)
        
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                
                let tmp =  newList[dragItem.current.grpI].items.splice(dragItem.current.itemI,1);
                
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, tmp[0]);
                console.log(oldList)
                console.log(newList)
                
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                console.log(JSON.parse(localStorage.getItem('List')))
                return newList
            })
        }
    }
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "ContentCard current"
        }
        return "ContentCard"
    }

    if (list) {
        return (                
            <div className="ContentPage">
            {list.map((grp, grpI) => (
              <div key={grp.title} onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null} className="ContentGroup">
                {grp.items.map((item, itemI) => (
                  <div draggable key={item}  onDragStart={(e) => handleDragStart(e, {grpI, itemI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI})}:null} className={dragging?getStyles({grpI, itemI}):"ContentCard"}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
            </div>
        )
    } else { return null}

}

export default DragNDrop;