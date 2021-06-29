import * as React from "react"
import { useTranslation } from "react-i18next";

// markup
const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>Route not found!</h2>
    </>
  )
}

export default NotFoundPage