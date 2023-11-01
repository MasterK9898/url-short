import React from "react";
import classNames from "classnames";

import PlanCard from "./plan";
import Header from "../../components/Header";

import "./index.scss";

export type MembershipDetail = {
    id: number;
    version: string;
    benefits: string[];
    price: number;
}

export type DemoMember = {
    id: number;
    username: string;
    currentPlan: number;
}
const membershipDetail: Array<MembershipDetail> = [
    {
        id: 0,
        version: "Bronze",
        benefits: [
            "Basic URL shortening",
            "Shortened URLs valid for 30 days",
            "Maximum of 50 shortened URLs per month",
            "Standard customer support",
            "Ads-supported short URLs redirect",
        ],
        price: 0,
    },
    {
        id: 1,
        version: "Silver",
        benefits: [
            "All Bronze benefits",
            "Customizable shortened URL aliases",
            "Password-protected URLs",
            "Shortened URLs valid for 1 year",
            "Maximum of 500 shortened URLs per month",
            "Priority customer support",
            "Analytics for URL clicks and demographics",
            "No ads during short URLs redirect",
        ],
        price: 49.99,
    },
    {
        id: 2,
        version: "Gold",
        benefits: [
            "All Silver benefits",
            "Unlimited URL shortening",
            "Shortened URLs never expire",
            "Ability to edit destination of shortened URL",
            "Custom branded domain for shortened URLs",
            "Dedicated account manager",
            "Advanced analytics with geographic details, device data, and more",
            "Bulk URL shortening tools",
            "API access for developers"
        ],
        price: 99.99,
    }
];


const demoMember: DemoMember = {
    id: 0,
    username: "John.Doe",
    currentPlan: 0,

}


const Membership: React.FunctionComponent = () => {

    return (
        <div>
            <Header />
            <div className={classNames("membership")}>
                <div className={classNames("membership-title")}>
                    Choose your plan
                </div>
                <div className={classNames("membership-prompt")}>
                "Unlock limitless possibilities and superior features by upgrading to our premium plan today!"
                </div>
                <div className={classNames("plans")}>
                    {membershipDetail.map((detail) => (
                        <PlanCard key={detail.id} planDetails={detail} member={demoMember} />
                    ))}
                </div>
                <div className={classNames("day-pass")}>
                    Or you may purchase your day pass for a higher level <span className={classNames("purchase-day-pass")}>here</span>.
                </div>
            </div>
        </div>
    );
};

export default Membership;