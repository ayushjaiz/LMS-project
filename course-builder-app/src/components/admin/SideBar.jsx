import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {Link, useLocation} from "react-router-dom"
import {RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill} from "react-icons/ri"

const SideBar = () => {
  const location = useLocation()
  return (
    <VStack
      spacing={'8'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p="16"
      // textAlign={'left'}
      alignItems={'flex-start'}
    >
      <LinkButton text="Dashboard" url={"dashboard"} Icon={RiDashboardFill} active={location.pathname === '/admin/dashboard'}/>
      <LinkButton text="Create Course" url={"createcourse"} Icon={RiAddCircleFill} active={location.pathname === '/admin/createcourse'}/>
      <LinkButton text="Courses" url={"courses"} Icon={RiEyeFill} active={location.pathname === '/admin/courses'}/>
      <LinkButton text="Users" url={"users"} Icon={RiUser3Fill} active={location.pathname === '/admin/user'}/>

      
    </VStack>
  );
};

export default SideBar;


function LinkButton ({url,Icon, text, active}) {
  return(

    <Link to={`/admin/${url}`}>
        <Button fontSize={"large"} variant={"ghost"} colorScheme={active?"purple":" "}>
          <Icon style={{margin: "4px"}}/>
          {text}
        </Button>
      </Link>
    )
}
