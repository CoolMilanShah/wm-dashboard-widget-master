/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";

import classNames from "classnames";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import PropTypes from "../../utils/propTypes";

const IconWidget = ({
  bgColor,
  icon: Icon,
  iconProps,
  title,
  subtitle,
  className,
  ...restProps
}) => {
  const classes = classNames("cr-widget", className, {
    [`bg-${bgColor}`]: bgColor
  });
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

IconWidget.defaultProps = {
  bgColor: "primary",
  icon: "span",
  iconProps: { size: 50 }
};

export default IconWidget;
