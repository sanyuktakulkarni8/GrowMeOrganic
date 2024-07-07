import React, { useState, useEffect } from 'react';

interface SubDepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

const departments: Department[] = [
  {
    id: 1,
    name: 'customer_service',
    subDepartments: [
      { id: 1, name: 'support' },
      { id: 2, name: 'customer_success' },
    ],
  },
  {
    id: 2,
    name: 'Design',
    subDepartments: [
      { id: 3, name: 'graphic_design' },
      { id: 4, name: 'product_design' },
      { id: 4, name: 'web_design' },
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Set<number>>(new Set());
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((depId) => depId !== id) : [...prev, id]
    );
  };

  const toggleSelectDepartment = (id: number) => {
    if (selectedDepartments.has(id)) {
      setSelectedDepartments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });

      const department = departments.find((d) => d.id === id);
      if (department) {
        department.subDepartments.forEach((sub) => {
          setSelectedSubDepartments((prev) => {
            const newSet = new Set(prev);
            newSet.delete(sub.id);
            return newSet;
          });
        });
      }
    } else {
      setSelectedDepartments((prev) => new Set(prev).add(id));
      const department = departments.find((d) => d.id === id);
      if (department) {
        department.subDepartments.forEach((sub) => {
          setSelectedSubDepartments((prev) => new Set(prev).add(sub.id));
        });
      }
    }
  };

  const toggleSelectSubDepartment = (departmentId: number, subId: number) => {
    if (selectedSubDepartments.has(subId)) {
      setSelectedSubDepartments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(subId);
        return newSet;
      });
    } else {
      setSelectedSubDepartments((prev) => new Set(prev).add(subId));
    }
  };

  useEffect(() => {
    departments.forEach((department) => {
      const allSubSelected = department.subDepartments.every((sub) =>
        selectedSubDepartments.has(sub.id)
      );
      if (allSubSelected) {
        setSelectedDepartments((prev) => new Set(prev).add(department.id));
      } else {
        setSelectedDepartments((prev) => {
          const newSet = new Set(prev);
          newSet.delete(department.id);
          return newSet;
        });
      }
    });
  }, [selectedSubDepartments]);

  return (
    <div>
      {departments.map((department) => (
        <div key={department.id}>
          <div>
            <span onClick={() => toggleExpand(department.id)}>
              {expanded.includes(department.id) ? '-' : '+'}
            </span>
            <input
              type="checkbox"
              checked={selectedDepartments.has(department.id)}
              onChange={() => toggleSelectDepartment(department.id)}
            />
            {department.name}
          </div>
          {expanded.includes(department.id) && (
            <div style={{ paddingLeft: '20px' }}>
              {department.subDepartments.map((sub) => (
                <div key={sub.id}>
                  <input
                    type="checkbox"
                    checked={selectedSubDepartments.has(sub.id)}
                    onChange={() => toggleSelectSubDepartment(department.id, sub.id)}
                  />
                  {sub.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
