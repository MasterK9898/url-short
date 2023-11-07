import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

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

type DemoPlan = {
    quota: number;
    description: string;
    price: number;
}

const membershipDetail: Array<MembershipDetail> = [
    {
        id: 0,
        version: "Bronze",
        benefits: [
            "Basic URL shortening",
            "Shortened URLs valid for 30 days",
            "Maximum of 20 shortened URLs per month",
            "Standard customer support",
            "Ads-supported short URLs redirect",
        ],
        price: 0,
    },
    {
        id: 1,
        version: "Silver",
        benefits: [
            "All Bronze benefits, plus",
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
            "All Silver benefits, plus",
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

const demoPlans: Array<DemoPlan> = [
    { quota: 10, description: "Starter", price: 1.59 },
    { quota: 30, description: "Standard", price: 4.49 },
    { quota: 50, description: "Advanced", price: 6.95 },
    { quota: 70, description: "Pro", price: 9.09 }
];


const Membership: React.FunctionComponent = () => {

    const [suppModal, setSuppModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState<DemoPlan | null>(null);


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
                    Or find our supplementary package <span className={classNames("purchase-day-pass")} onClick={() => {setSuppModal(true)}}>here</span>.
                </div>
            </div>

            <Modal
                className={classNames("suppModal")}
                show={suppModal}
                onHide={() => {
                    setSuppModal(false);
                    setSelectedPack(null);
                }}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '20px', fontWeight: '500' }}>Supp. Packages</Modal.Title>
                </Modal.Header>

                <Modal.Body className={classNames("supp-description")}>
                    <div className={classNames("one-time-prompt")} style={{ marginBottom: '10px', fontWeight: '400' }}>
                        One time purchase, life-long usage
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', gap: '10px', height: '300px', padding: '10px' }}>
                        {demoPlans.map((plan, index) => (
                            <div
                                key={index}
                                tabIndex={0}
                                onClick={() => {
                                    setSelectedPack(plan);
                                }}
                                style={{
                                    flex: '0 0 auto',
                                    width: '160px',
                                    height: '80%',
                                    border: selectedPack && selectedPack.quota === plan.quota ? '2px solid #282c34' : '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    backgroundColor: '#ffffff',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}><strong>{plan.description} Pack</strong></div>
                                <div style={{ fontSize: '14px', marginBottom: '8px' }}>{plan.quota} Quotas</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>${plan.price} <span style={{fontSize: '10px'}}>+tax</span></div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        {selectedPack ? `Selected: ${selectedPack.quota} quota (${selectedPack.description})` : 'No pack selected...'}
                    </div>
                    <Button
                        className={classNames("one-time-purchase")}
                        style={{
                            marginLeft: 'auto',
                            backgroundColor: 'transparent',
                            borderColor: '#282c34',
                            color: '#282c34',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            transition: 'transform 0.3s ease, background-color 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#282c34';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#282c34';
                        }}
                    >
                        Get It Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Membership;