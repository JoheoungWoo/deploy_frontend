import Event from "../../json/campusLife/event.json";
import { makeCommonCard } from "../../util/makeDivUtils/makeCommonCard";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const EventsComponent = () => {
  const renderedPeriods = new Set();

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {Event.map((event, idx) => {
        const isNewPeriod = !renderedPeriods.has(event.period);
        if (isNewPeriod) renderedPeriods.add(event.period);

        return (
          <div key={idx} className="space-y-6">
            {/* 🔹 날짜: 카드 기준 중앙 → 그 안에서 좌측 */}
            {isNewPeriod && (
              <div className="flex justify-center">
                <div className="w-full max-w-md text-left">
                  {makeCommonTitle(event.period)}
                </div>
              </div>
            )}

            {/* 🔹 카드: 중앙 정렬 */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {makeCommonCard(
                  event.title,
                  [
                    <img
                      key="img"
                      src={event.image}
                      alt=""
                      className="w-full h-48 object-cover rounded"
                    />,
                    <div
                      key="period"
                      className="text-sm text-gray-500 text-center"
                    >
                      {event.period}
                    </div>,
                    <div
                      key="location"
                      className="font-semibold text-center"
                    >
                      {event.location}
                    </div>,
                    <div key="dept" className="text-sm text-center">
                      {event.department}
                    </div>,
                    <div
                      key="tags"
                      className="flex flex-wrap justify-center gap-2"
                    >
                      {event.category?.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                        >
                          {c}
                        </span>
                      ))}
                      {event.format?.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>,
                  ],
                  {
                    headerRight: (
                      <span className="text-xs font-semibold text-green-600">
                        {event.status}
                      </span>
                    ),
                  }
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsComponent;
