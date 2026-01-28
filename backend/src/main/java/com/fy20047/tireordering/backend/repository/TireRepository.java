package com.fy20047.tireordering.backend.repository;

import com.fy20047.tireordering.backend.entity.Tire;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TireRepository extends JpaRepository<Tire, Long> {

    @Query("select t from Tire t where t.isActive = true order by t.brand, t.series, t.size")
    List<Tire> findActiveTires();
}
