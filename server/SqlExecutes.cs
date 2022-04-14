using System;
using System.Data;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

namespace server
{
    public class SqlExecutes
    {
        private static SqlExecutes _instance = new SqlExecutes();

        public static SqlExecutes Instance => _instance;

        private readonly string connString = "Server=127.0.0.1; Database=test; port=3306; User Id=root; password=vietanh;";
        // private readonly string connString = "Server=127.0.0.1;port=3306;User Id=root;password=;Database=test;";
        // private readonly string connString = "Server=127.0.0.1; Database=test; port=3306; User Id=root; password=;";

        public DataTable ExcuteQuery(string query)
        {
            DataTable dataTable = new DataTable();

            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        MySqlDataReader reader = cmd.ExecuteReader();
                        dataTable.Load(reader);
                        reader.Close();
                    }
                    conn.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return dataTable;
        }
        public int ExcuteNonQuery(string query)
        {
            int numberOfRow = 0;
            using (MySqlConnection conn = new MySqlConnection(connString))
            {
                try
                {
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        conn.Open();
                        numberOfRow = cmd.ExecuteNonQuery();
                    }
                    conn.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return numberOfRow;
        }
    }


    public static class ExtentionClass
    {
        public static List<T> ToList<T>(this DataTable dataTable)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dataTable.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (var pro in temp.GetProperties())
            {
                pro.SetValue(obj, dr[pro.Name], null);
            }
            return obj;
        }
    }
}