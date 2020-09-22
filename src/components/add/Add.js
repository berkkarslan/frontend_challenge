import React from 'react';
import './Add.css';
import { NavLink } from 'react-router-dom'

function Add() {
  return (
    <div>
      <NavLink to="/">
        Return to List
      </NavLink>
      <div>
      Ekleme Sayfası
      </div>
    </div>
  );
}

export default Add;
