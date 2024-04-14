const ConversionHistory = ({ data }) => (
  <div>
    {data?.map((item, index) => {
      const { fromAmount, toAmount, timestamp } = JSON.parse(item);
      const date = new Date(timestamp);
      const dateStr = date.toDateString();
      const timeStr = date.toLocaleTimeString([], {
        timeZoneName: 'short',
      });

      return (
        <div className="padding-h" key={index}>
          {fromAmount} =&gt; {toAmount} | {dateStr} | {timeStr}
        </div>
      );
    })}
  </div>
);

export default ConversionHistory;
