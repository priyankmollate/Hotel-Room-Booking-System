/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

import Link from 'next/link';
import React from 'react';

function Room({ room }) {
  return (
    <article className='room'>
      <div className='img-container'>
        <img
          src={room?.room_images?.[0]?.url || '/images/jpeg/defaultBcg2.jpg'}
          alt={room?.room_name || 'Room'}
        />
        <div className='price-top'>
          ${room?.room_price}
          <span> / night</span>
        </div>
        <Link className='btn-primary room-link' href={`/rooms/${room?.room_slug}`}>
          View room
        </Link>
      </div>
      <p className='room-info'>{room?.room_name}</p>
    </article>
  );
}

export default Room;
