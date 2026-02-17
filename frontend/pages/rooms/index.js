/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/home/Banner';
import Hero from '../../components/home/Hero';
import MainLayout from '../../components/layout';
import RoomFilter from '../../components/rooms/RoomsFilter';
import RoomList from '../../components/rooms/RoomsList';

const { publicRuntimeConfig } = getConfig();

function Rooms(props) {
  const [ourRooms, setOurRooms] = useState([]);
  const [ourFilteredRooms, setOurFilteredRooms] = useState([]);

  // if props rooms exists to setOurRooms
  useEffect(() => {
    if (props?.rooms) {
      setOurRooms(props?.rooms?.data?.rows);
      setOurFilteredRooms(props?.rooms?.data?.rows);
    }
  }, [props]);

  return (
    <MainLayout title='Macau Resort ― Rooms'>
      <Hero hero='roomsHero'>
        <Banner title='our rooms'>
          <Link className='btn-primary' href='/'>
            return home
          </Link>
        </Banner>
      </Hero>

      {/* featured rooms */}
      <Skeleton loading={!props?.rooms && !props?.error} paragraph={{ rows: 10 }} active>
        {props?.rooms?.data?.rows?.length === 0 ? (
          <Empty
            className='mt-10'
            description={(<span>Sorry! Any data was not found.</span>)}
          />
        ) : props?.error ? (
          <Result
            title='Failed to fetch'
            subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
            status='error'
          />
        ) : (
          <>
            <RoomFilter
              ourRooms={ourRooms}
              setOurFilteredRooms={setOurFilteredRooms}
            />
            <RoomList
              rooms={ourFilteredRooms}
            />
          </>
        )}
      </Skeleton>
    </MainLayout>
  );
}

const API_TIMEOUT_MS = 8000;

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${publicRuntimeConfig.API_BASE_URL}/api/v1/all-rooms-list`,
      { timeout: API_TIMEOUT_MS }
    );
    const rooms = response?.data?.result;

    return {
      props: {
        rooms,
        error: null
      }
    };
  } catch (err) {
    const message = err?.code === 'ECONNABORTED'
      ? 'Request timed out. Is the backend running on the correct port?'
      : (err?.response?.data?.result?.error || err?.message || 'Failed to fetch rooms');
    return {
      props: {
        rooms: null,
        error: { message }
      }
    };
  }
}

export default Rooms;
