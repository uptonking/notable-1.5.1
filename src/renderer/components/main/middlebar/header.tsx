import * as React from "react";
import { connect } from "overstated";
import Main from "@renderer/containers/main";
import { SortingBys, SortingTypes } from "@renderer/utils/sorting";

/**
 * 标题排序管理条
 */
const Header = ({ sortBy, sortType, setBy, toggleType }) => {
  const sortByName =
      sortBy === SortingBys.TITLE
        ? "Title"
        : sortBy === SortingBys.DATE_CREATED
        ? "Date Created"
        : "Date Modified",
    sortTypeName = sortType === SortingTypes.ASC ? "Ascending" : "Descending";

  return (
    <div className="layout-header list-header xsmall">
      {/* 选择排序依据，按标题首字母/按创建时间/按修改时间 */}
      <div className="multiple joined fluid center-y">
        <div
          className="sort-by select fluid"
          title={`Sorting by: ${sortByName}`}
        >
          <span>{sortByName}</span>
          <select onChange={(e) => setBy(e.target.value)} value={sortBy}>
            <option value={SortingBys.TITLE}>Title</option>
            <option value={SortingBys.DATE_CREATED}>Date Created</option>
            <option value={SortingBys.DATE_MODIFIED}>Date Modified</option>
          </select>
        </div>
        {/* 选择升序/降序 */}
        <div className="sort-type" onClick={toggleType} title={sortTypeName}>
          <i
            className={`icon ${
              sortType === SortingTypes.ASC ? "rotate-180" : ""
            }`}
          >
            chevron_down
          </i>
        </div>
      </div>
    </div>
  );
};

export default connect({
  container: Main,
  selector: ({ container }) => ({
    sortBy: container.sorting.getBy(),
    sortType: container.sorting.getType(),
    setBy: container.sorting.setBy,
    toggleType: container.sorting.toggleType,
  }),
})(Header);
