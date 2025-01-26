import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getBooks } from "../../slices/books";
import BookCard from "../../components/BookCard";
import PromoCard from "../../components/PromoCard/indext";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.reducer.books);

  useEffect(() => {
    if (!list.length) {
      dispatch(getBooks());
    }
  }, [dispatch, list]);

  return (
    <div className="">
      <div className="p-12">
        <PromoCard></PromoCard>
      </div>
      <div className="  p-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {list.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
