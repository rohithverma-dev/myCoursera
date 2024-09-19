import React, { useEffect } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';
import './dashboard.css';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <div className="dashboard-databox">
    <p style={{ textAlign: 'left' }} className="custom-text-xl">
      {title}
    </p>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <p className="custom-text-2xl">{qty}</p>
      <div style={{ display: 'flex' }}>
        <p
          style={{ fontWeight: 100 }}
          className="custom-text-xl"
        >{`${qtyPercentage}%`}</p>
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </div>
    </div>
    <p
      style={{ opacity: '0.6', fontSize: '0.85rem', textAlign: 'left' }}
      className="custom-text-xl"
    >
      {'Since Last Month'}
    </p>
  </div>
);

const Progress = ({ value = 0, colorScheme = 'purple', width = '100%' }) => {
  const colors = {
    purple: {
      background: '#E9D8FD',  // Light purple
      fill: '#9B6CDB'         // Darker purple
    },
  };

  const { background, fill } = colors[colorScheme] || colors.purple;

  return (
    <div
      style={{
        width: width,
        backgroundColor: background,
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: '8px',  // Adjust height as needed
          backgroundColor: fill,
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
};

const Bar = ({ title, value, profit }) => (
  <div className="dashboard-bar">
    <h1
      style={{ fontSize: '1rem', marginBottom: '8px' }}
      className="custom-heading-xl"
    >
      {title}
    </h1>

    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <p style={{ textAlign: 'left', opacity: 0.7 }} className="custom-text-xl">
        {profit ? '0%' : `-${value}%`}
      </p>
      <Progress value={profit ? value : 0} colorScheme="purple" />
      <p style={{ textAlign: 'left', opacity: 0.7 }} className="custom-text-xl">
        {`${value > 100 ? value : 100}%`}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    viewsCount,
    subscriptionCount,
    usersCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <div
      style={{cursor:`url(${cursor}), default`}}
      className='dashboard-grid'
    >
      {loading || !stats ? (
        <Loader />
      ) : (
        <div
          style={{
            padding: '64px 0',
            '@media (max-width: 600px)': {
              padding: '64px 16px',
            },
          }}
        >
          <p
            style={{ fontSize: '0.95rem', textAlign: 'center', opacity: '0.5' }}
            className="custom-text-xl"
          >
            {`Last change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          </p>

          <h1
            style={{ marginLeft: '64px', marginBottom: '64px' }}
            className="dashboard-h1"
          >
            Dashboard
          </h1>

          <div className="dashboard-databox-parent">
            <Databox
              key={1}
              title="Views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
            />
            <Databox
              key={2}
              title="Users"
              qty={usersCount}
              qtyPercentage={usersPercentage}
              profit={usersProfit}
            />
            <Databox
              key={3}
              title="Subscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </div>

          <div
            style={{
              margin: '64px',
              padding: '64px',
              marginTop: '64px',
              borderRadius: '12px',
              boxShadow: '-2px 0 10px rgba(107,70,193,0.5)',
              '@media (max-width: 600px)': {
                padding: '0',
                margin: '0',
                marginTop: '16px',
              },
            }}
          >
            <h1
              style={{
                fontSize: '1.25rem',
                marginLeft: '64px',
                marginBottom: '64px',
              }}
              className="dashboard-h1"
            >
              Views Graph
            </h1>

            <LineChart views={stats.map(item => item.views)} />
          </div>

          <div className='dashboard-second-grid' >
            <div style={{ padding: '16px' }}>
              <h1
                style={{
                  fontSize: '1.25rem',
                  margin: '32px 0',
                  marginLeft: '64px',
                }}
                className="dashboard-h1"
              >
                Progress Bar
              </h1>

              <div>
                <Bar
                  profit={viewsProfit}
                  //  profit={true}
                  title="Views"
                  value={viewsPercentage}
                  //  value={30}
                />
                <Bar
                  profit={usersProfit}
                  //  profit={true}
                  title="Users"
                  value={usersPercentage}
                  //  value={10}
                />
                <Bar
                  profit={subscriptionProfit}
                  //  profit={false}
                  title="Subscription"
                  value={subscriptionPercentage}
                  //  value={52}
                />
              </div>
            </div>

            <div
              style={{
                padding: '64px 16px',
                '@media (max-width: 600px)': {
                  padding: '0px',
                },
              }}
            >
              <h1
                style={{
                  fontSize: '1.25rem',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
                className="dashboard-h1"
              >
                Users
              </h1>
              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
              {/* <DoughnutChart   /> */}
            </div>
          </div>
        </div>
      )}

      <Sidebar />
    </div>
  );
};

export default Dashboard;
