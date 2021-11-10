import React, { useState } from "react";
import "./style.css";

/**
 * @author Rizwan Khan
 * @function
 **/

export const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className='modalFixedBg'>
        <div style={{ position: "relative" }}>
          <div className='modalClose' onClick={props.onClose}>
            X
          </div>
          <div className='modalContainer'>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export const MaterialInput = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className='materialInput'>
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className='input'
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
    </div>
  );
};

export const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div
      style={{
        width: "100%",

        ...props.style,
      }}
    >
      <button
        className='materialButton'
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
        onClick={onClick}
      >
        {props.title && props.title}
      </button>
    </div>
  );
};

export const DropdownMenu = (props) => {
  return (
    <div className='headerDropdownContainer'>
      {props.menu}
      <div className='dropdown'>
        <div className='upArrow'></div>
        {props.firstMenu}
        <ul className='headerDropdownMenu'>
          {props.menus &&
            props.menus.map((item, index) => (
              <li key={index}>
                <a
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick && item.onClick();
                    }
                  }}
                  href={`${item.href}`}
                >
                  {item.label}
                </a>
                {/* <a
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick && item.onClick();
                    }
                  }}
                  href={`${item.href}`}
                >
                  {item.label}
                </a> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const Breed = (props) => {
  return (
    <div className='breed'>
      <ul>
        {props.breed &&
          props.breed.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              {props.breedIcon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export const Anchor = (props) => {
  return (
    <button {...props} className='anchorButton'>
      {props.name}
    </button>
  );
};
