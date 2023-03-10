import { useEffect} from "react";
import { useGroups } from "../contexts/GroupsProvider";


const GroupNameLabel = (()  => {
  const {currentGroup} = useGroups();


  //function to set groupId in messages
  const getGroupname = (() => {
    return currentGroup ? ` : ${currentGroup.name}` : "";
	});

  useEffect(()=>{

  },[currentGroup])

  return(

   <>
    Chat {getGroupname()}
   </>

  );
});

export default GroupNameLabel;