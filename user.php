<?php
    import_request_variables("pg", "form_");
    $db = mysql_connect("localhost:/export/mysql/mysql.sock");
    mysql_select_db("app", $db);
    $rows = mysql_query("select * from transaction where hash = '$form_hash'", $db);
    if(mysql_num_rows($rows) == 0) {
        $error = "Transaction not found";
    } else {
        $transaction_hash = mysql_result($rows, 0, 0);
		$transaction_amount = mysql_result($rows, 0, 1);
		$transaction_due_date = mysql_result($rows, 0, 2);
		$today = time();
		$diff_in_days = ($today - $transaction_due_date) / (60 * 60 * 24);
		$transaction_penalty = ($transaction_amount * 2) / 100;
		$transaction_interest = (($transaction * 0.033) / 100) * $diff_in_days;
		$transaction_total_amount = $transaction_amount + $transaction_penalty + $transaction_interest;
    }
?>
<html>
	<head>
		<title>Transaction</title>
	</head>
	<body>
		<?php
			if($error) {
				echo "<h1>Error accessing transaction</h1>\n";
				echo "<p>$error</p>\n";
			} else {
				echo "<h1>Information about $form_hash</h1>\n";
				echo "<p>amount: $transaction_amount</p>\n";
				echo "<p>due date: $transaction_due_date</p>\n";
				echo "<p>penalty: $transaction_penalty</p>\n";
				echo "<p>interest: $transaction_interest</p>\n";
				echo "<p>total: $transaction_total</p>\n";
			}
		?>
	</body>
</html>
