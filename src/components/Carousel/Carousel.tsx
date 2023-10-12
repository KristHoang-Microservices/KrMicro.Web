import { ReactElement, useEffect, useState } from "react";
import { useWindowSize } from "@/hooks";
import { PagedList } from "@/models/pagedList.model";
import { Pagination } from "@nextui-org/react";

export interface CarouselProps<T> {
  items: T[];
  renderItems: (item: T, index: number) => ReactElement;
}

export function Carousel<T>({
  items,
  renderItems,
}: CarouselProps<T>): ReactElement {
  const windowSize = useWindowSize();
  const pageSize: number =
    windowSize.width !== undefined
      ? windowSize?.width >= 1280
        ? 6
        : windowSize?.width >= 768
        ? 4
        : 2
      : 0;

  const [page, setPage] = useState<PagedList<T>>({
    listData: items.slice(0, pageSize > items.length ? undefined : pageSize),
    currentPage: 1,
    totalPage: Math.ceil(items.length / parseFloat(`${pageSize}`)),
    pageSize: pageSize,
  });

  useEffect(() => {
    setPage({
      listData: items.slice(0, pageSize >= items.length ? undefined : pageSize),
      currentPage: 1,
      totalPage: Math.ceil(items.length / parseFloat(`${pageSize}`)),
      pageSize: pageSize,
    });
  }, [pageSize, items]);

  function updatePage(pageNo: number) {
    setPage((prev) => ({
      ...prev,
      listData: items.slice(
        (pageNo - 1) * pageSize,
        pageNo === prev.totalPage ? undefined : pageNo * pageSize,
      ),
      currentPage: pageNo,
    }));
  }

  console.log(page);

  return (
    <div className={"relative"}>
      <div
        className={
          "w-full relative grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2"
        }
      >
        {page.listData.map(renderItems)}
      </div>
      <div className={"font-bold mt-4 flex justify-end"}>
        {page.totalPage > 0 && (
          <Pagination
            total={page.totalPage}
            showControls
            loop
            color={"primary"}
            variant={"flat"}
            defaultValue={1}
            page={page.currentPage}
            onChange={(page: number) => updatePage(page)}
          />
        )}
      </div>
    </div>
  );
}
