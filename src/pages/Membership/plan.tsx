import React from "react";
import { Card, Button } from "react-bootstrap";
import classNames from "classnames";
import { MembershipDetail } from ".";
import { Tier, User } from "../../interface/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { subscribe } from "../../utils/api";

interface PlanCardProps {
  planDetails: MembershipDetail;
}

const rank = [Tier.Bronze, Tier.Silver, Tier.Gold];

const PlanCard: React.FunctionComponent<PlanCardProps> = ({ planDetails }) => {
  const { value } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!value) {
      navigate("/membership-login");
    }
  }, [value]);

  const disabled =
    rank.indexOf(value?.tier as any) >= rank.indexOf(planDetails.version);

  const text = React.useMemo(() => {
    const userIndex = rank.indexOf(value?.tier as any);
    const planIndex = rank.indexOf(planDetails.version);
    if (userIndex === planIndex) {
      return "Current Plan";
    } else if (userIndex > planIndex) {
      return "Not Available";
    } else {
      return "Get Membership";
    }
  }, [value, planDetails.version]);
  return (
    <Card className={classNames(`plan-${planDetails.id}-card`)}>
      <Card.Header className={classNames("plan-version")}>
        {planDetails.version}
      </Card.Header>
      <Card.Body className={classNames("plan-benefits")}>
        <ul>
          {planDetails.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </Card.Body>
      <div className={classNames("plan-price")}>
        {planDetails.price === 0 ? (
          "Free"
        ) : (
          <>
            {`${planDetails.price} /mo. `}
            <span style={{ fontSize: "16px" }}>+ tax</span>
          </>
        )}
      </div>

      <Card.Footer className={classNames("plan-footer")}>
        <Button
          className={classNames(`plan-${planDetails.id}-confirm`)}
          onClick={() => {
            subscribe(planDetails.version);
          }}
          disabled={disabled}
        >
          {text}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PlanCard;
