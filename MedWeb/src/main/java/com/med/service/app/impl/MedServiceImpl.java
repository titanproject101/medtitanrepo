package com.med.service.app.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.med.dao.MedDao;
import com.med.service.app.MedService;
import com.tinkerpop.rexster.client.RexProException;
import com.tinkerpop.rexster.client.RexsterClient;

@Service("medService")
public class MedServiceImpl implements MedService {

	@Autowired
	private MedDao medDao;
	
	public long getVerticesCount() {
		try {
			List<Long> response = null;
			RexsterClient rexsterClient = medDao.getRexsterClient();
			response = rexsterClient.execute("g.V.count()");
			return response.get(0);
		} catch (RexProException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return 0;
	}

	public long getEdgesCount() {
		try {
			List<Long> response = null;
			RexsterClient rexsterClient = medDao.getRexsterClient();
			response = rexsterClient.execute("g.E.count()");
			return response.get(0);
		} catch (RexProException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return 0;
	}

}
