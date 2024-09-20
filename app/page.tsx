"use client";
import { useState } from "react";

// item structure to hold the data
class Item {
  stt: string;
  date: string;
  amount: number;
  subject: string;
  provider: string;

  constructor(stt: string, date: string, amount: number, subject: string, provider: string) {
    this.stt = stt;
    this.date = date;
    this.amount = amount;
    this.subject = subject;
    this.provider = provider;
  }
}

class Result {
  result: Item[];
  total: number;

  constructor(result: Item[], total: number) {
    this.result = result;
    this.total = total;
  }
}

export default function Home() {
  const url = "https://saokeapi.doffylaw.org/?q=";
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(new Result([], 0));

  // Function to fetch data based on the search query
  const fetchData = async () => {
    try {
      setLoading(true);
      // with CORS enabled, we can fetch data from the API, url encode query
      // string to handle special characters
      const response = await fetch(`${url}${encodeURIComponent(query)}`, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        if (response.status === 404) {
          setError("No transactions found");
        } else if (response.status === 400) {
          const result = await response.json();
          setError(result?.detail?.message);
        }
        else {
          throw new Error("Failed to fetch data");
        }
      } else {
        const result = await response.json();
        const data = new Result(result.result, result.total);
        setResult(data);
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      if (err instanceof TypeError) {
        setError("Failed to fetch data");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      setResult(new Result([], 0)); // Clear any previous data
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }

    fetchData();
  };

  return (
    <div className="grid grid-rows-[] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Add a title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Tìm kiếm sao kê - giao dịch - var check - ủng hộ bão lũ yagi - miền
          bắc
        </h1>
        {/* Add a table to display data search   */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Searching for transactions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            // onKeyPress is deprecated, use onKeyDown instead
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick(e);
              }
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSearchClick}
          >
            search
          </button>
        </div>
        <div className="flex items-center gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
        <div className="flex items-center gap-4">
          {/* show total number of transactions */}
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {/* display with specific locale */}
            Total transactions: {result.total.toLocaleString("en-US")}
          </p>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">stt/id</th>
                <th className="px-4 py-2">date</th>
                <th className="px-4 py-2">amount</th>
                <th className="px-4 py-2">content</th>
                <th className="px-4 py-2">provider</th>
              </tr>
            </thead>
            <tbody>
              {result.total > 0 &&
                result.result.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{item.stt}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.amount}</td>
                    <td className="px-4 py-2">{item.subject}</td>
                    <td className="px-4 py-2">{item.provider}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
