import React from "react";
import { Card, Button } from "react-bootstrap";
import classNames from "classnames";
import { MembershipDetail, DemoMember } from ".";


interface PlanCardProps {
    planDetails: MembershipDetail;
    member: DemoMember;
}

const PlanCard: React.FunctionComponent<PlanCardProps> = ({ planDetails, member }) =>  {
    return (
        <Card className={classNames(`plan-${planDetails.id}-card`)}>
            <Card.Header className={classNames("plan-version")}>
                {planDetails.version}
            </Card.Header>
            <Card.Body className={classNames("plan-benefits")}>
                <ul>
                    {planDetails.benefits.map((benefit, index) => (
                        <li key={index}>
                            {benefit}
                        </li>
                    ))}
                </ul>
            </Card.Body>
            <div className={classNames("plan-price")}>
                {
                    planDetails.price === 0
                        ? "Free"
                        : <>
                            {`${planDetails.price} /mo. `}
                            <span style={{fontSize: '16px'}}>+ tax</span>
                        </>
                }
            </div>

            <Card.Footer className={classNames("plan-footer")}>
            <Button
                className={classNames(`plan-${planDetails.id}-confirm`)}
                disabled={planDetails.id === member.currentPlan}
            >
                {
                    planDetails.id === member.currentPlan
                        ? "Current Plan"
                        : (planDetails.id === 0 ? "Get Free Version" : "Get Membership")
                }
            </Button>

            </Card.Footer>
        </Card>
    );
};

export default PlanCard;
