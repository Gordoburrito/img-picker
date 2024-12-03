"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { listObjects } from "../../services/s3Service";

type S3Object = {
  Key: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
  Owner?: {
    DisplayName?: string;
    ID?: string;
  };
  Metadata?: Record<string, string>;
};

interface Filters {
  keywords?: string;
  title?: string;
  componentName?: string;
  width?: number;
  height?: number;
  template?: string;
  type?: string;
}

const useS3Objects = (
  bucketName: string,
  filters: Filters = {},
  groupByMetadataKey?: string
) => {
  const [objects, setObjects] = useState<S3Object[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const objectList = await listObjects(bucketName);
        setObjects(objectList as S3Object[]);
      } catch (_err) {
        setError("Failed to fetch objects");
      }
    };

    fetchObjects();
  }, [bucketName]);

  const filterObjects = useCallback((objectList: S3Object[]) => {
    return objectList.filter((obj) => {
      if (filters.keywords && !obj.Metadata?.keywords?.includes(filters.keywords)) return false;
      if (filters.title && !obj.Metadata?.title?.includes(filters.title)) return false;
      if (filters.componentName && obj.Metadata?.componentName !== filters.componentName) return false;
      if (filters.width && obj.Metadata?.width !== filters.width.toString()) return false;
      if (filters.height && obj.Metadata?.height !== filters.height.toString()) return false;
      if (filters.template && obj.Metadata?.template !== filters.template) return false;
      if (filters.type && obj.Metadata?.type !== filters.type) return false;
      return true;
    });
  }, [filters]);

  const groupObjects = useCallback((objectList: S3Object[]) => {
    if (!groupByMetadataKey) return objectList;

    return objectList.reduce((acc, obj) => {
      const metadataValue = obj.Metadata?.[groupByMetadataKey] || 'undefined';
      if (!acc[metadataValue]) {
        acc[metadataValue] = [];
      }
      acc[metadataValue].push(obj);
      return acc;
    }, {} as Record<string, S3Object[]>);
  }, [groupByMetadataKey]);

  const filteredAndGroupedObjects = useMemo(() => {
    const filteredObjects = filterObjects(objects);
    return groupObjects(filteredObjects);
  }, [objects, filterObjects, groupObjects]);

  return { objects: filteredAndGroupedObjects, error };
};

export default useS3Objects;