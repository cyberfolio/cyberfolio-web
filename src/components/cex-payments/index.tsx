import { FC, useEffect, useState } from "react";
import CexService from "services/cex";
import { PaymentHistoryResponse } from "services/cex/types";
import AppUtils from "utils/index";
import classNames from "classnames";
import toast from "react-hot-toast";
import "./index.module.scss";
import AppHooks from "hooks";

type Props = {
  show: boolean;
};
const CexPayments: FC<Props> = ({ show }) => {
  const evmAddress = AppHooks.useAppSelector((state) => state.evmAddress);
  const [history, setHistory] = useState<PaymentHistoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const init = async (evmAddress: string) => {
    if (!evmAddress) return;

    try {
      setLoading(true);
      const paymentHistory = await CexService.getPaymentHistory();
      if (paymentHistory.length === 0) {
        setInfoMessage("Only Binance payment history is supported");
      } else {
        setHistory(paymentHistory);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init(evmAddress);
  }, [evmAddress]);

  useEffect(() => {
    if (!evmAddress) {
      setHistory([]);
    }
  }, [evmAddress]);

  return (
    <div className={classNames("cex-payments", show && "cex-payments--show")}>
      <div className="cex-payments__header">
        <div className="cex-payments__header__item cex-payments__header__item--first">CEX</div>
        <div className="cex-payments__header__item">TYPE</div>
        <div className="cex-payments__header__item cex-payments__header__item--center">FEE</div>
        <div className="cex-payments__header__item cex-payments__header__item--center">STATUS</div>
        <div className="cex-payments__header__item cex-payments__header__item--center">DATE</div>
        <div className="cex-payments__header__item cex-payments__header__item--last">AMOUNT</div>
      </div>
      <div className="cex-payments__assets">
        {loading && (
          <div className="cex-payments__assets__loading">
            <div className="fa-3x">
              <i className="fas fa-sync fa-spin cex-payments__assets__loading--white"></i>
            </div>
          </div>
        )}
        {infoMessage && <div className="cex-payments__assets__empty">{infoMessage}</div>}
        {history &&
          history.map((item, index: number) => {
            const cexLogo = AppUtils.cexInfo.filter((info) => info.name === item.cexName)[0]?.image;
            return (
              <div
                key={item.orderNo + index}
                className={classNames(
                  "cex-payments__assets__asset",
                  index === 0 && "cex-payments__assets__asset--first",
                  history.length - 1 && "cex-payments__assets__asset--last",
                )}
              >
                <div
                  className="cex-payments__assets__asset__item 
                                cex-payments__assets__asset__item--asset 
                                cex-payments__assets__asset__item--first"
                >
                  <div className="cex-payments__assets__asset__item__chain">
                    <div className="cex-payments__assets__asset__item__chain__name">{item.cexName}</div>
                    <img src={cexLogo} alt={item.cexName} className="cex-payments__assets__asset__item__chain__logo" />
                  </div>
                </div>
                <div className="cex-payments__assets__asset__item cex-payments__assets__asset__item--left">
                  {item.type}
                </div>
                <div className="cex-payments__assets__asset__item cex-payments__assets__asset__item--center">
                  {item.fee}
                </div>
                <div className="cex-payments__assets__asset__item cex-payments__assets__asset__item--center">
                  {item.status}
                </div>
                <div className="cex-payments__assets__asset__item cex-payments__assets__asset__item--center">
                  {item.date}
                </div>
                <div className="cex-payments__assets__asset__item cex-payments__assets__asset__item--last">
                  {item.amount}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CexPayments;
