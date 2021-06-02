const catchErrors = (error) => {
  let errorMsg;

  if (error.response) {
    // Nếu yêu cầu được thực hiện và máy chủ không phản hồi với mã trạng thái trong phạm vi 2xx

    errorMsg = error.response.data;

    console.error(errorMsg);
  } else if (error.request) {
    // Nếu yêu cầu được thực hiện và không nhận được phản hồi từ máy chủ
    errorMsg = error.request;

    console.error(errorMsg);
  } else {
    // Nếu có điều gì khác xảy ra trong khi thực hiện yêu cầu
    errorMsg = error.message;

    console.error(errorMsg);
  }
  return errorMsg;
};

export default catchErrors;
