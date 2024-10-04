"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { listObjects } from "../../services/s3Service";

const useS3Objects = (
  bucketName: string,
  filters: {
    keywords?: string;
    title?: string;
    componentName?: string;
    width?: number;
    height?: number;
    template?: string;
    type?: string;
  } = {}
) => {
  const [objects, setObjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const objectList = await listObjects(bucketName);
        setObjects(objectList);
      } catch (err) {
        setError("Failed to fetch objects");
      }
    };

    fetchObjects();
  }, [bucketName]);

  // const filterObjects = useCallback((objectList: any[]) => {
  //   return objectList.filter((obj) => {
  //     if (filters.keywords && !obj.keywords.includes(filters.keywords)) return false;
  //     if (filters.title && !obj.title.includes(filters.title)) return false;
  //     if (filters.componentName && obj.componentName !== filters.componentName) return false;
  //     if (filters.width && obj.width !== filters.width) return false;
  //     if (filters.height && obj.height !== filters.height) return false;
  //     if (filters.template && obj.template !== filters.template) return false;
  //     return true;
  //   });
  // }, [filters]);

  // const memoizedFilters = useMemo(() => filters, [
  //   filters.keywords,
  //   filters.title,
  //   filters.componentName,
  //   filters.width,
  //   filters.height,
  //   filters.template,
  //   filters.type
  // ]);

  // useEffect(() => {
  //   const fetchObjects = async () => {
  //     try {
  //       const objectList = await listObjects(bucketName);
  //       const filteredObjects = filterObjects(objectList);
  //       setObjects(filteredObjects);
  //     } catch (err) {
  //       setError("Failed to fetch objects");
  //     }
  //   };

  //   fetchObjects();
  // }, [bucketName, memoizedFilters, filterObjects]);

  return { objects, error };
};

export default useS3Objects;