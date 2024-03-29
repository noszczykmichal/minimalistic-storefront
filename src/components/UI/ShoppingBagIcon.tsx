import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./ShoppingBagIcon.module.css";

function ShoppingBagIcon({ animateCheckmark }: { animateCheckmark: boolean }) {
  const nodeRef = useRef(null);

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 384"
    >
      <defs />
      <path
        fill="#fefefe"
        d="M497.93,396q0,94.25.07,188.5c0,2.69-.43,3.51-3.38,3.51q-188.7-.13-377.4,0c-2.79,0-3.22-.68-3.22-3.3q.12-188.69,0-377.37c0-2.53.3-3.33,3.18-3.33q188.88.15,377.78,0c2.63,0,3,.61,3,3.11Q497.87,301.54,497.93,396ZM315.82,575.34c8.39.43,16.63-1,24.74-2.66q76.9-16.12,118.9-82.64c5.83-9.24,11-18.89,14.21-29.46.36-.79.78-1.56,1.07-2.38A178.25,178.25,0,0,0,484.55,375c-4.82-39.88-20.8-74.67-48.79-103.39-39-40-86.78-58.24-142.65-54.9a170.49,170.49,0,0,0-63.72,16.52C153.54,269.41,112.72,350.51,130,432.56c11.87,56.47,44.51,97.84,95.69,124.37,22.46,11.65,46.65,17.44,71.87,18.78C303.62,576,309.75,576.39,315.82,575.34Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#5ece7b"
        d="M315.83,575.34c-6.08,1-12.21.7-18.29.37-25.22-1.34-49.41-7.13-71.87-18.78C174.49,530.4,141.85,489,130,432.56c-17.26-82.05,23.56-163.15,99.41-199.34a170.49,170.49,0,0,1,63.72-16.52c55.87-3.34,103.65,14.88,142.65,54.9,28,28.72,44,63.51,48.79,103.39a178.25,178.25,0,0,1-9.81,83.21c-.29.82-.71,1.59-1.07,2.38-1.76-.34-2.62-1.85-3.74-3Q395.52,383.27,321.14,308.9c-1.18-1.17-2-3-4.18-2.75l.26,0-.83-.8.1.05-.74-.85c-.56-.66-1.13-1.31-1.68-2-9.15-11-20.87-15.45-34.72-11.93-13.49,3.43-22,12.56-24.66,26.31-1.45,7.47-.62,15.18-.41,22.79l-.15,1c-9.23-.08-18.45-.28-27.67-.17-3.36,0-5,2.35-5.3,5.65-.91,9.68-1.91,19.35-2.79,29-2.6,28.54-5,57.1-7.85,85.61-.67,6.72,1.19,11.41,7.07,14.54-.64,1.79,1.07,2.26,1.88,3.07q46.69,46.8,93.45,93.52C314,573,315.26,573.87,315.83,575.34Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#189c5f"
        d="M317,306.15c2.14-.23,3,1.58,4.18,2.75q74.4,74.34,148.79,148.71c1.12,1.12,2,2.63,3.74,3-3.18,10.57-8.38,20.22-14.21,29.46q-41.91,66.45-118.9,82.64c-8.11,1.7-16.35,3.09-24.73,2.66-.57-1.47-1.87-2.32-2.91-3.37q-46.73-46.76-93.45-93.52c-.81-.81-2.52-1.28-1.88-3.07a45.6,45.6,0,0,0,8.58.62q33,0,66,0c4.41,0,4.41,0,3.07-4-13-38.56,15.59-78.74,56.19-79.06,6.79-.06,6.92-.07,6.34-6.78-1.14-13.31-2.44-26.6-3.66-39.9-.31-3.28-1.92-5.66-5.29-5.7-9.24-.11-18.47.1-27.71.18l-.11-1C321.1,328.31,322.51,316.82,317,306.15Zm35.3,97.17a49.58,49.58,0,1,0,49.56,49.88A49.6,49.6,0,0,0,352.26,403.32Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#fdfefd"
        d="M321.06,340.71c9.24-.08,18.47-.29,27.71-.18,3.37,0,5,2.42,5.29,5.7,1.22,13.3,2.52,26.59,3.66,39.9.58,6.71.45,6.72-6.34,6.78-40.6.32-69.16,40.5-56.19,79.06,1.34,4,1.34,4-3.07,4q-33,0-66,0a45.6,45.6,0,0,1-8.58-.62c-5.88-3.13-7.74-7.82-7.07-14.54,2.84-28.51,5.25-57.07,7.85-85.61.88-9.68,1.88-19.35,2.79-29,.31-3.3,1.94-5.61,5.3-5.65,9.22-.11,18.44.09,27.67.17q0,6.91-.08,13.83c0,3.13,1.54,5.16,4.68,5.07s4.6-2.16,4.54-5.27c0-2.12-.1-4.23-.14-6.35l.15-7.43,48.68.08c0,4.61,0,9.22,0,13.82,0,3.13,1.5,5.17,4.6,5.18s4.65-2,4.63-5.13C321.1,349.92,321.09,345.31,321.06,340.71Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#fafdfc"
        d="M317,306.15c5.55,10.67,4.14,22.16,4,33.51l-8.89,0c0-5.61,0-11.21-.16-16.81-.36-13.54-11.29-24.27-24.49-24.13a24.54,24.54,0,0,0-24.13,24.47c-.08,5.48,0,11-.08,16.44l-8.17.22-.75-.12c-.21-7.61-1-15.32.41-22.79,2.67-13.75,11.17-22.88,24.66-26.31,13.85-3.52,25.57.89,34.72,11.93.55.66,1.12,1.31,1.68,2,.07.44.22.8.74.85l-.1-.05c.09.47.08,1,.83.8Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#1c9f61"
        d="M254.28,339.71l.75.12a65.12,65.12,0,0,0,8.1,8.17c0,2.12.1,4.23.14,6.35.06,3.11-1.45,5.18-4.54,5.27s-4.69-1.94-4.68-5.07q0-6.92.08-13.83Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#189c5f"
        d="M316.49,305.36c-.52-.05-.67-.41-.74-.85Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#189c5f"
        d="M317.22,306.11c-.75.23-.74-.33-.83-.8Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#fdfdfd"
        d="M352.26,403.32a49.58,49.58,0,1,1-49.82,49.24A49.59,49.59,0,0,1,352.26,403.32Zm-5.86,67.53a7.41,7.41,0,0,0,4.5-2.44q12.15-11.69,24.32-23.35c3.18-3.06,3.65-6,1.43-8.43s-5.34-2.16-8.74,1.08c-6.42,6.11-12.87,12.2-19.18,18.43-1.8,1.77-3,2.42-5,.18a96,96,0,0,0-8.23-7.63c-2.79-2.44-5.93-2.42-8-.12s-1.78,5.18.79,7.61c4.62,4.38,9.35,8.65,14.05,12.95A5.78,5.78,0,0,0,346.4,470.85Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#26a269"
        d="M312.06,339.64l8.89,0,.11,1c0,4.6,0,9.21.08,13.81,0,3.14-1.53,5.15-4.63,5.13s-4.62-2-4.6-5.18c0-4.6,0-9.21,0-13.82Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#189c5f"
        d="M312.06,339.64l-.1,1-48.68-.08-.08-1c0-5.48,0-11,.08-16.44a24.54,24.54,0,0,1,24.13-24.47c13.2-.14,24.13,10.59,24.49,24.13C312.05,328.43,312,334,312.06,339.64Z"
        transform="translate(-114 -204)"
      />
      <path
        fill="#179b5f"
        d="M263.2,339.61l.08,1-.15,7.43a65.12,65.12,0,0,1-8.1-8.17Z"
        transform="translate(-114 -204)"
      />
      <CSSTransition
        in={animateCheckmark}
        timeout={300}
        classNames={{
          appear: classes["fadeIn-appear"],
          enterDone: classes["fadeIn-enter-done"],
        }}
        nodeRef={nodeRef}
        mountOnEnter
      >
        <path
          className={classes.checkmark}
          d="M346.4,470.86a5.83,5.83,0,0,1-4-1.73c-4.7-4.3-9.43-8.57-14.05-12.95-2.57-2.43-2.78-5.37-.79-7.61s5.17-2.32,8,.12a96,96,0,0,1,8.23,7.63c2,2.24,3.21,1.59,5-.18,6.31-6.23,12.76-12.32,19.18-18.43,3.4-3.24,6.41-3.59,8.74-1.08s1.75,5.37-1.43,8.43q-12.14,11.69-24.32,23.35A7.47,7.47,0,0,1,346.4,470.86Z"
          ref={nodeRef}
        />
      </CSSTransition>
    </svg>
  );
}

export default ShoppingBagIcon;
