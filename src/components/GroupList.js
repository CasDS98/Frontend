import React, { useContext, useMemo } from "react";
import { GroupsContext } from "../contexts/GroupsProvider";
import Group from "./Group"

const GroupList = () => {
   const { groups, error, loading } = useContext(GroupsContext);

   const allGroups = useMemo(() => {
      return groups
    }, [groups]);
  
    if (loading) return <h1 data-cy="loading">Loading...</h1>;
    if (error)
      return (
        <p data-cy="groups_error" className="error">
          {JSON.stringify(error, null, 2)}
        </p>
      );
    if (!groups || !groups.length) {
      return (
        <p className="text-white info flex flex-row items-center">
          <span className="flex-1">There are no groups</span>
        </p>
      );
    }

   return (
      <div class="p-2">
      {allGroups.map((group) => {return <Group key={group.id} {...group}></Group>})}
      </div>

   );
};

export default GroupList;