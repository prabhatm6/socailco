import React from "react";
import { Link } from 'react-router-dom'

export default function SidebarOptions({ Icon, text,to }) {
  return (
    <div className="sidebar__items">
      <Icon />
      <Link to={to || '#'}>{text}</Link>
    </div>
  );
}
