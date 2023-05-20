package virtualica.util;

import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {
    public static Map<String, Object> jsonStructureNoData(HttpStatus httpStatus) {
        return Map.of(
                "code", httpStatus.value(),
                "status", httpStatus.getReasonPhrase()
        );
    }

    public static Map<String, Object> jsonStructureWithData(HttpStatus httpStatus, Object data) {
        Map<String, Object> jsonStructure = new HashMap<>(jsonStructureNoData(httpStatus));
        jsonStructure.put("data", data);

        return jsonStructure;
    }
}
