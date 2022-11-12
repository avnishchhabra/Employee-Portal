import { Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import React from "react";

const Dashboard = () => {
  return (
    <Card>
      <div className="flex justifyBetween" style={{ padding: "10px 80px" }}>
        <div className="flex fColumn" style={{ gap: "30px" }}>
          <div className="statisticCard">
            <Statistic
              title="Last Month Score"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>
          <div className="statisticCard">
            <Statistic
              title="Total Trainings Assigned"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>
        </div>
        <div className="flex fColumn" style={{ gap: "30px" }}>
          <div className="statisticCard">
            <Statistic
              title="Total Training Completed"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
          <div className="statisticCard">
            <Statistic
              title="Remaining Trainings"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
        </div>

        <div className="flex fColumn" style={{ gap: "30px" }}>
          <div className="statisticCard">
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </div>

          <div className="statisticCard">
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;
