import './styles.css';

const ConversionHistory = ({ data }) => (
  <div className="conversion-history-root">
    {data?.map((item, index) => {
      const { fromAmount, toAmount, timestamp } = JSON.parse(item);
      const date = new Date(timestamp);
      const dateStr = date.toDateString();
      const timeStr = date.toLocaleTimeString([], {
        timeZoneName: 'short',
      });

      return (
        <div className="history-item" key={index}>
          <div>
            {fromAmount} &#x21e8; {toAmount}
          </div>
          <div>{dateStr},</div>
          <div>{timeStr} &#9997;</div>
        </div>
      );
    })}
  </div>
);

export default ConversionHistory;
