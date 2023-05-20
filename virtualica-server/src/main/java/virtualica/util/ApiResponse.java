package virtualica.util;

import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {
    public static Map<String, Object> jsonNoData(HttpStatus httpStatus) {
        return Map.of(
                "code", httpStatus.value(),
                "status", httpStatus.getReasonPhrase()
        );
    }

    public static Map<String, Object> jsonWithData(HttpStatus httpStatus, Object data) {
        Map<String, Object> jsonStructure = new HashMap<>(jsonNoData(httpStatus));
        jsonStructure.put("data", data);

        return jsonStructure;
    }
}
