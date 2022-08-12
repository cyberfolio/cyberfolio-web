import CexService from "@services/cex";
import { PaymentHistoryResponse } from "@services/cex/types";
import utils from "@utils/index";
import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./index.scss";

const PaymentHistory = () => {
  const [history, setHistory] = useState<PaymentHistoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      const paymentHistory = await CexService.getPaymentHistory();
      setHistory(paymentHistory);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="payments-history">
      <div className="payments-history__header">
        <div className="payments-history__header__item payments-history__header__item--first">CEX</div>
        <div className="payments-history__header__item">TYPE</div>
        <div className="payments-history__header__item payments-history__header__item--center">FEE</div>
        <div className="payments-history__header__item payments-history__header__item--center">STATUS</div>
        <div className="payments-history__header__item payments-history__header__item--center">DATE</div>
        <div className="payments-history__header__item payments-history__header__item--last">AMOUNT</div>
      </div>
      <div className="payments-history__assets">
        {loading && (
          <div className="payments-history__assets__loading">
            <div className="fa-3x">
              <i className="fas fa-sync fa-spin payments-history__assets__loading--white"></i>
            </div>
          </div>
        )}
        {history &&
          history.map((item, index: number) => {
            const cexLogo = utils.cexInfo.filter((info) => info.name === item.cex)[0]?.image;
            return (
              <div
                key={item.orderNo + index}
                className={classNames(
                  "payments-history__assets__asset",
                  index === 0 && "payments-history__assets__asset--first",
                  history.length - 1 && "payments-history__assets__asset--last",
                )}
              >
                <div
                  className="payments-history__assets__asset__item 
                                payments-history__assets__asset__item--asset 
                                payments-history__assets__asset__item--first"
                >
                  <div className="payments-history__assets__asset__item__chain">
                    <div className="payments-history__assets__asset__item__chain__name">{item.cex}</div>
                    <img src={cexLogo} alt={item.cex} className="payments-history__assets__asset__item__chain__logo" />
                  </div>
                </div>
                <div className="payments-history__assets__asset__item payments-history__assets__asset__item--left">
                  {item.type}
                </div>
                <div className="payments-history__assets__asset__item payments-history__assets__asset__item--center">
                  {item.fee}
                </div>
                <div className="payments-history__assets__asset__item payments-history__assets__asset__item--center">
                  {item.status}
                </div>
                <div className="payments-history__assets__asset__item payments-history__assets__asset__item--center">
                  {item.date}
                </div>
                <div className="payments-history__assets__asset__item payments-history__assets__asset__item--last">
                  {item.amount}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PaymentHistory;
