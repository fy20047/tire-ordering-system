package com.fy20047.tireordering.backend.service;

import com.fy20047.tireordering.backend.entity.Tire;
import com.fy20047.tireordering.backend.repository.TireRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class TireService {

    private final TireRepository tireRepository;

    public TireService(TireRepository tireRepository) {
        this.tireRepository = tireRepository;
    }

    public List<Tire> getActiveTires() {
        return tireRepository.findActiveTires();
    }

    public List<Tire> getAllTires() {
        return tireRepository.findAll(Sort.by("brand", "series", "size"));
    }

    public Tire getTireById(Long tireId) {
        return tireRepository.findById(tireId)
                .orElseThrow(() -> new IllegalArgumentException("Tire not found"));
    }
}
