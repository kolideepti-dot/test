import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "./actions/watchlist";
import styles from "../css/watchlist.module.css";

function Watchlist() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.watchlist);

  console.log("list", list)

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  return (
    <div>
      <h2>Your Watchlist</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="watchlist">
        {Array.isArray(list) && list.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.row}>
            <div className={`font-semibold ${styles.stock}`}>{item.stock}</div>
            <div className={`${item.indexChange > 0 ? styles.positive : styles.negative}`}>{item.ltp} </div>
          </div>
             <div className={styles.row}>
              <div className={styles.exchange}>{item.exchange}</div>
              <div className={styles.exchange}>
                {item.indexChange > 0 ? `+${item.indexChange}` : item.indexChange} ({item.indexChangePercent}%)
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Watchlist;
