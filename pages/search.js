import { gql, useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {BlogContainer, Header} from '../components'

const Search = () => {
    const [searchFilter, setSearchFilter] = useState("");

    const [blogs, setBlogs] = useState([]);

    const clientApollo = useApolloClient();

    const SEARCH_BLOG = useMemo(
      () => gql`
        query blogs(
          $orderBy: Blog_orderBy
          $orderDirection: OrderDirection
          $where: Blog_filter
        ) {
          blogs(
            orderBy: $orderBy
            orderDirection: $orderDirection
            where: $where
          ) {
            id
            blogcoverhash
            blogtitle
            category
            user
          }
        }
      `,
      []
    );
  
   const getBlogs = useCallback(async () => {
     clientApollo
       .query({
         query: SEARCH_BLOG,
         variables: {
           orderBy: "createdAt",
           orderDirection: "desc",
           where: {
             ...(searchFilter && {
               blogtitle_contains_nocase: searchFilter,
             }),
           },
         },
         fetchPolicy: "network-only",
       })
       .then(({ data }) => {
         console.log(data);
         setBlogs(data);
       })
       .catch((error) => {
         console.error(error);
       });
   }, [SEARCH_BLOG, clientApollo, searchFilter]);

   useEffect(() => {
     getBlogs();
   }, [searchFilter, getBlogs]);

  console.log(blogs)
  
  return (
    <div className="font-body">
      <Head>
        <title>Octo 🐙 Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center mt-8">
        <input
          placeholder="Search Blog"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="px-5 py-3 rounded-xl outline-none border-sky-500/20 bg-[#1E364A] placeholder-slate-400 contrast-more:border-sky-400 contrast-more:placeholder-sky-500 bg-transparent font-body mt-3  focus:ring-0  text-2xl"
        />
      </div>

      {searchFilter ? (
        <div className="grid grid-cols-3 gap-6 h-max md:grid-cols-2 sm:grid-cols-1 px-[28px] sm:px-1 sm:gap-1 md:gap-y-1 max-w-[1440px] my-0 mx-auto">
          {blogs &&
            blogs?.blogs?.map((data) => (
              <BlogContainer key={data.id} data={data} />
            ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="items-center justify-center my-10">Search Blog 🐙</h1>
        </div>
      )}
    </div>
  );
}

export default Search